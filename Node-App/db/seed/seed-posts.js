var seeder = require('mongoose-seed');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../config/config.json')[env];

// Connect to MongoDB via Seeder
seeder.connect(`mongodb+srv://${config.username}:${config.password}@${config.cluster}/${config.database}?retryWrites=true&w=majority`, function() {
 
  // Load Mongoose models
  seeder.loadModels([
    __dirname + '/../../models/blog.js'
  ]);
 
  // Clear specified collections
  seeder.clearModels(['blog'], function() {
    // Callback to populate DB once collections have been cleared
    seeder.populateModels(data, function() {
      seeder.disconnect();
    });
 
  });
});
 
// Data array containing seed data - documents organized by Model
var data = [
    {
        'model': 'blog',
        'documents': [
            {
                "title":"Test Seed",
                "content":`seeder.populateModels(dataArray, [callback])
                Populates MongoDB with documents in dataArray. dataArray consists of objects with 'model' and 'documents' keys, where 'documents' is an array of valid collection documents. Note that Mongoose Schema validation is enforced.`,
                "date":"1576281600",
                "comments":[
                   {
                      "name":"Bob",
                      "date":"June 25, 2021 05:46:AM",
                      "comment":"Here's where you'll find this repository's source files. To give your users an idea of what they'll find here, add a description to your repository.",
                      "reply":[
                         {
                            "name":"Sharah",
                            "date":"June 25, 2021 05:46:AM",
                            "comment":"Here's where you'll find this repository's source files. To give your users an idea of what they'll find here, add a description to your repository.",
                            "reply":[
                               {
                                  "name":"Jason",
                                  "date":"June 25, 2021 05:46:AM",
                                  "comment":"Here's where you'll find this repository's source files. To give your users an idea of what they'll find here, add a description to your repository."
                               }
                            ]
                         }
                      ]
                   },
                   {
                      "name":"Kasun",
                      "date":"June 25, 2021 05:46:AM",
                      "comment":"Here's where you'll find this repository's source files. To give your users an idea of what they'll find here, add a description to your repository.",
                      "reply":[
                         {
                            "name":"Namila",
                            "date":"June 25, 2021 05:46:AM",
                            "comment":"Here's where you'll find this repository's source files. To give your users an idea of what they'll find here, add a description to your repository.",
                            "reply":[
                               
                            ]
                         }
                      ]
                   },
                   {
                      "name":"Bob",
                      "date":"June 25, 2021 05:46:AM",
                      "comment":"Here's where you'll find this repository's source files. To give your users an idea of what they'll find here, add a description to your repository.",
                      "reply":[
                         
                      ]
                   }
                ]
             },
             {
               "title":"Test Seed 1",
               "content":`seeder.populateModels(dataArray, [callback])
               Populates MongoDB with documents in dataArray. dataArray consists of objects with 'model' and 'documents' keys, where 'documents' is an array of valid collection documents. Note that Mongoose Schema validation is enforced.`,
               "date":"1576281600",
               "comments":[
                  {
                     "name":"Bob",
                     "date":"June 25, 2021 05:46:AM",
                     "comment":"Here's where you'll find this repository's source files. To give your users an idea of what they'll find here, add a description to your repository.",
                     "reply":[
                        {
                           "name":"Sharah",
                           "date":"June 25, 2021 05:46:AM",
                           "comment":"Here's where you'll find this repository's source files. To give your users an idea of what they'll find here, add a description to your repository.",
                           "reply":[
                              {
                                 "name":"Jason",
                                 "date":"June 25, 2021 05:46:AM",
                                 "comment":"Here's where you'll find this repository's source files. To give your users an idea of what they'll find here, add a description to your repository."
                              }
                           ]
                        }
                     ]
                  },
                  {
                     "name":"Kasun",
                     "date":"June 25, 2021 05:46:AM",
                     "comment":"Here's where you'll find this repository's source files. To give your users an idea of what they'll find here, add a description to your repository.",
                     "reply":[
                        {
                           "name":"Namila",
                           "date":"June 25, 2021 05:46:AM",
                           "comment":"Here's where you'll find this repository's source files. To give your users an idea of what they'll find here, add a description to your repository.",
                           "reply":[
                              
                           ]
                        }
                     ]
                  },
                  {
                     "name":"Bob",
                     "date":"June 25, 2021 05:46:AM",
                     "comment":"Here's where you'll find this repository's source files. To give your users an idea of what they'll find here, add a description to your repository.",
                     "reply":[
                        
                     ]
                  }
               ]
            },
            {
               "title":"Test Seed 2",
               "content":`seeder.populateModels(dataArray, [callback])
               Populates MongoDB with documents in dataArray. dataArray consists of objects with 'model' and 'documents' keys, where 'documents' is an array of valid collection documents. Note that Mongoose Schema validation is enforced.`,
               "date":"1576281600",
               "comments":[
                  {
                     "name":"Bob",
                     "date":"June 25, 2021 05:46:AM",
                     "comment":"Here's where you'll find this repository's source files. To give your users an idea of what they'll find here, add a description to your repository.",
                     "reply":[
                        {
                           "name":"Sharah",
                           "date":"June 25, 2021 05:46:AM",
                           "comment":"Here's where you'll find this repository's source files. To give your users an idea of what they'll find here, add a description to your repository.",
                           "reply":[
                              {
                                 "name":"Jason",
                                 "date":"June 25, 2021 05:46:AM",
                                 "comment":"Here's where you'll find this repository's source files. To give your users an idea of what they'll find here, add a description to your repository."
                              }
                           ]
                        }
                     ]
                  },
                  {
                     "name":"Kasun",
                     "date":"June 25, 2021 05:46:AM",
                     "comment":"Here's where you'll find this repository's source files. To give your users an idea of what they'll find here, add a description to your repository.",
                     "reply":[
                        {
                           "name":"Namila",
                           "date":"June 25, 2021 05:46:AM",
                           "comment":"Here's where you'll find this repository's source files. To give your users an idea of what they'll find here, add a description to your repository.",
                           "reply":[
                              
                           ]
                        }
                     ]
                  },
                  {
                     "name":"Bob",
                     "date":"June 25, 2021 05:46:AM",
                     "comment":"Here's where you'll find this repository's source files. To give your users an idea of what they'll find here, add a description to your repository.",
                     "reply":[
                        
                     ]
                  }
               ]
            },
            {
               "title":"Test Seed 3",
               "content":`seeder.populateModels(dataArray, [callback])
               Populates MongoDB with documents in dataArray. dataArray consists of objects with 'model' and 'documents' keys, where 'documents' is an array of valid collection documents. Note that Mongoose Schema validation is enforced.`,
               "date":"1576281600",
               "comments":[
                  {
                     "name":"Bob",
                     "date":"June 25, 2021 05:46:AM",
                     "comment":"Here's where you'll find this repository's source files. To give your users an idea of what they'll find here, add a description to your repository.",
                     "reply":[
                        {
                           "name":"Sharah",
                           "date":"June 25, 2021 05:46:AM",
                           "comment":"Here's where you'll find this repository's source files. To give your users an idea of what they'll find here, add a description to your repository.",
                           "reply":[
                              {
                                 "name":"Jason",
                                 "date":"June 25, 2021 05:46:AM",
                                 "comment":"Here's where you'll find this repository's source files. To give your users an idea of what they'll find here, add a description to your repository."
                              }
                           ]
                        }
                     ]
                  },
                  {
                     "name":"Kasun",
                     "date":"June 25, 2021 05:46:AM",
                     "comment":"Here's where you'll find this repository's source files. To give your users an idea of what they'll find here, add a description to your repository.",
                     "reply":[
                        {
                           "name":"Namila",
                           "date":"June 25, 2021 05:46:AM",
                           "comment":"Here's where you'll find this repository's source files. To give your users an idea of what they'll find here, add a description to your repository.",
                           "reply":[
                              
                           ]
                        }
                     ]
                  },
                  {
                     "name":"Bob",
                     "date":"June 25, 2021 05:46:AM",
                     "comment":"Here's where you'll find this repository's source files. To give your users an idea of what they'll find here, add a description to your repository.",
                     "reply":[
                        
                     ]
                  }
               ]
            },
            {
               "title":"Test Seed 4",
               "content":`seeder.populateModels(dataArray, [callback])
               Populates MongoDB with documents in dataArray. dataArray consists of objects with 'model' and 'documents' keys, where 'documents' is an array of valid collection documents. Note that Mongoose Schema validation is enforced.`,
               "date":"1576281600",
               "comments":[
                  {
                     "name":"Bob",
                     "date":"June 25, 2021 05:46:AM",
                     "comment":"Here's where you'll find this repository's source files. To give your users an idea of what they'll find here, add a description to your repository.",
                     "reply":[
                        {
                           "name":"Sharah",
                           "date":"June 25, 2021 05:46:AM",
                           "comment":"Here's where you'll find this repository's source files. To give your users an idea of what they'll find here, add a description to your repository.",
                           "reply":[
                              {
                                 "name":"Jason",
                                 "date":"June 25, 2021 05:46:AM",
                                 "comment":"Here's where you'll find this repository's source files. To give your users an idea of what they'll find here, add a description to your repository."
                              }
                           ]
                        }
                     ]
                  },
                  {
                     "name":"Kasun",
                     "date":"June 25, 2021 05:46:AM",
                     "comment":"Here's where you'll find this repository's source files. To give your users an idea of what they'll find here, add a description to your repository.",
                     "reply":[
                        {
                           "name":"Namila",
                           "date":"June 25, 2021 05:46:AM",
                           "comment":"Here's where you'll find this repository's source files. To give your users an idea of what they'll find here, add a description to your repository.",
                           "reply":[
                              
                           ]
                        }
                     ]
                  },
                  {
                     "name":"Bob",
                     "date":"June 25, 2021 05:46:AM",
                     "comment":"Here's where you'll find this repository's source files. To give your users an idea of what they'll find here, add a description to your repository.",
                     "reply":[
                        
                     ]
                  }
               ]
            }
        ]
    }
];