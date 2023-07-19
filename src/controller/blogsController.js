const authorModel = require("../Model/authorModel");
const blogModel = require("../Model/blogsModel");
const mongoose = require('mongoose');




//<=================Validators ================================>>//


const isValid = function (value) {
  if (typeof value == undefined || value == null) return false
  if (value.trim().length == 0) return false
  else if (typeof value == "string") return true
}


//========================CREATE BLOGS ===================================

const createBlog = async (req, res) => {
  try {
    let {title,content,authorId,category,isPublished,publishedAt} = req.body;

    if (Object.keys(req.body).length == 0) {
      return res.status(400).send({ status: false, msg: "Data is required for Blog Creation" });
    }
    if (!(title)){
      return res.status(400).send({ status: false, msg: "Please Enter Book Title" })};
    if (!(content)){
      return res.status(400).send({ status: false, msg: "Please Enter the Book Description" })};

    if (!(authorId)){
      return res.status(400).send({ status: false, msg: "Author ID is Mandatory" })};

    if (authorId) {
      if (!mongoose.Types.ObjectId.isValid(authorId)) {
        return res.status(400).send({ status: false, msg: "Please Enter Valid Author Id " })
      // } else {
        // req.body.authorId = authorId

      }
    }

    if (authorId) {
      if (authorId !== req.token.authorId) {
        return res.status(403).send({ status: false, msg: "You are not Authenticate to Create blog." })
      }
      // req.body.authorId = authorId

    }

    if (!(category))
      return res.status(400).send({ status: false, msg: "Please Enter book Category" });

   
    let getAuthorData = await authorModel.findById(authorId);

    if (!getAuthorData)
      return res.status(404).send({ status: false, msg: "No such author found" });

    let getBlogData = await blogModel.create(req.body);
    return res.status(201).send({ status: true, data: getBlogData });
  }
  catch (err) {
     return res.status(500).send({ status: false, error: err.message });
  }
}

const getBlogs =async (req, res) => {
    try {
        let {blog} = req.params;
        const allBlogs = await blogModel.find({ blog:blog});
        if (!allBlogs) {
          return res.status(404).send({ status: false, msg: " blogs  are found or deleted." });
        }
      
        return res.status(200).send({ status: true, msg:"succusseful",data:allBlogs });
    
      } catch (err) {
         return res.status(500).send({ status: false, msg: err.message });
      }
    };
  

// const getBlogsByFilter = async (req, res) => {
//   try {

//     let { authorId, category, content } = req.query;
//     let filter = { isDeleted: false, isPublished: true }

//     if (authorId) { 
//       filter.authorId = authorId 
//     }

//     if (authorId) {
//       if (!mongoose.Types.ObjectId.isValid(authorId)) {
//         return res.status(400).send({ status: false, msg: "Please Enter Valid Author Id " })
//       }
//     }
//     if (authorId) {
//       if (authorId !== req.token.authorId) {
//         return res.status(403).send({ status: false, msg: "You are not authorised to perform this task" })
//       }
//     }
//     if (category) { filter.category = category }
//     if (tags) { filter.tags = tags }
//     if (subcategory) { filter.subcategory = subcategory }

//     let savedData = await blogModel.find(filter)
//     if (savedData.length == 0) {
//       return res.status(404).send({ status: false, msg: "Such Blogs Not Available" })
//     } else {
//       return res.status(200).send({ status: true, data: savedData })
//     }
//   } catch (err) {
//     res.status(500).send({ status: false, msg: err.message })
//   }
// }


const getBlogById = async (req, res) => {
    try {
        let blogid = req.params.blogId
        if (!blogid)
            return res.status(400).send({ status: false, msg: "please give blog id" })
        if (!mongoose.Types.ObjectId.isValid(blogid))
            return res.status(400).send({ status: false, msg: "please enter valid blogid" })

        const Blog = await blogModel.findById(blogid)

        if (!Blog || Blog.isDeleted == true)
            return res.status(404).send({ status: false, message: "No Blog Found" })

        return res.status(200).send({ status: true, message: "Blog list", data: Blog })
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message });
    }

}




const updateBlogs = async (req, res) => {
    try {
      let alldata = req.body
      let blogId = req.params.blogId
  
      if (Object.keys(alldata).length == 0)
        return res.status(400).send({ status: false, msg: "Please Enter Blog Details For Updating" })
  
      if (!blogId)
        return res.status(400).send({ status: false, msg: "Blog Id is required" })
  
        if (!mongoose.Types.ObjectId.isValid(blogId))
            return res.status(400).send({ status: false, msg: "please enter valid blogid" })

      let findBlogId = await blogModel.findById(blogId)
  
      if (findBlogId.isDeleted == true) {
         return res.status(404).send({ status: false, msg: "Blogs already deleted" }) 
        }
  
      let updatedBlog = await blogModel.findOneAndUpdate({ _id: blogId }, {
        $set: {
          title: alldata.title,
          content: alldata.content,
          category: alldata.category,
          publishedAt: new Date(),
          isPublished: true
        },
        $push: { tags: alldata.tags}
      }, { new: true })
      return res.status(200).send({ status: true, msg:"success",data: updatedBlog })
    }
    catch (err) {
      return res.status(500).send({ status: false, msg: err.message })
    }
  };
  

  const deleteByParams = async function (req, res) {
    try {
      let id = req.params.blogId;
      const allBlogs = await blogModel.findOne({ _id: id, isDeleted: false });
      if (!allBlogs) {
        return res.status(404).send({ status: false, msg: "This blog is not found or deleted." });
      }
    
      const updated = await blogModel.findByIdAndUpdate({ _id: id }, { $set: { isDeleted: true, deletedAt: Date.now() } });
      return res.status(200).send({ status: true, msg: "Successfully Blog Deleted" });
  
    } catch (err) {
       return res.status(500).send({ status: false, msg: err.message });
    }
  };


  module.exports={createBlog,getBlogById,getBlogs,updateBlogs,deleteByParams}
  