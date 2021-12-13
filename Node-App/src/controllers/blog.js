const blog = require('../../models/blog');

async function getAll(req, res) {
    try{
        const pageNumber = Math.max(0, (parseInt(req.query.pageNumber)-1));
        const pageSize = parseInt(req.query.pageSize);
        const blogCount = await blog.countDocuments({});
        const blogs = await blog.find()
          .select()
          .skip(pageSize * pageNumber)
          .limit(pageSize)
          .lean();

        const paginationPages = Math.ceil((blogCount)/pageSize);
        const responseData = {
            blogs: blogs,
            paginationPages: paginationPages
        };

        res.status(200).json({ message: 'Success', data: responseData });
    }catch(error){
        console.log(error);
    }
}

async function getById(req, res) {
    try{
        const blogPost = await blog.findOne({
            _id: Object(req.params.id)
        }).lean();
        const otherArticles = await blog.find({
            _id: { $ne: Object(req.params.id) }
        }).lean();
        res.status(200).json({ message: 'Success', data: {
            blogPost: blogPost,
            otherArticles:otherArticles
        } });
    }catch(error){
        console.log(error);
    }
}

async function create(req, res) {
    try{
        const newBlog = await blog.create({ 
            title: req.body.title,
            date: req.body.date,
            content: req.body.content,
            comments: []
         });
        res.status(200).json({ message: 'Success', data: newBlog });
    }catch(error){
        console.log(error);
    }
}

async function saveComment(req, res) {
    try{
        const filter = { _id: Object(req.body._id) };
        const update = { comments: req.body.comments };
        const updateBlog = await blog.findOneAndUpdate(filter, update);
        res.status(200).json({ message: 'Success', data: updateBlog });
    }catch(error){
        console.log(error);
    }
}

module.exports = {
    getAll,
    getById,
    create,
    saveComment
};