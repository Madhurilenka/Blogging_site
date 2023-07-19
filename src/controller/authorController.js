const authorModel = require("../Model/authorModel");
const jwt = require('jsonwebtoken')



// Regex for Email Validation--
const validateEmail = function (email) {
    return (/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/).test(email)

}

//================================================function Creation of Author Data ===========================



const createAuthor = async (req, res) => {
    try {
        let {fname,lname,title,email,password}= req.body;

        if (Object.keys(req.body).length == 0) {
            return res.status(400).send({ status: false, msg: " Date is require for Author Data Creation" });
        }
       
        if (!(fname)) {
            return res.status(400).send({ status: false, msg: "First Name is Mandatory : Please Enter..!!" });
        }
        if (!(/^[A-Za-z][A-Za-z-\s ][^\s-]+$/).test(fname)) { return res.status(400).send({ status: false, msg: "Error : First Name should be Alphabates Only." }) }
        // let validLname =/^[A-Za-z][A-Za-z-\s ][^\s-]+$/

       
        
        if (!(lname)) {
            return res.status(400).send({ status: false, msg: "Enter your last Name" });
        }
        if (!(/^[A-Za-z][A-Za-z-\s ][^\s-]+$/).test(lname)) { return res.status(400).send({ status: false, msg: "Error : Last Name should be Alphabates Only." }) }

        if (!(title)) {
            return res.status(400).send({ status: false, msg: "Enter your title" });
        }
        if (!["Mr", "Miss", "Mrs","Dr"].includes(title)) {
            return res.status(400).send({ status: false, msg: "Title must be type of  ['Mr','Miss','Mrs']" })
        }
        if (!(email)) {
            return res.status(400).send({ status: false, msg: "Please Enter your Email id" });
        }
        if (!validateEmail(email))
            return res.status(400).send({ status: false, msg: "Please Enter a valid email" })

        email = email.toLowerCase() // if user send Email in uppercase so by using toLowerCase it convert auto lower case

        let emailExited = await authorModel.findOne({ email:email })
        if (emailExited) {
            return res.status(400).send({ status: false, msg: "This Email already exists, Please Try another !" });
        }

        if (!(password)) {
            return res.status(400).send({ status: false, msg: "Please Enter your password" });
        }
        // let validPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/
        if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/.test(req.body.password)) { return res.status(400).send({ status: false, msg: "Invalid Password, It should be length(6-15) character [Ex - Abc@123]" }) }


        let getAuthorData = await authorModel.create(req.body);
        return res.status(201).send({ status: true,mas:"success", data: getAuthorData });


    } catch (err) {
       return res.status(500).send({ status: false, msg: err.message });
    }
}

//============================================= Create Author Login Credential ===========================================

const authorLogin = async function (req, res) {
    try {

        let { email, password } = req.body
        if (!email)
            return res.status(400).send({ status: false, message: "EmailId is mandatory" })
        if (!password)
            return res.status(400).send({ status: false, message: "Password is mandatory" })
        let author = await authorModel.findOne({ email: email, password: password });
        if (!author)
            return res.status(401).send({ status: false, message: "Your Credencial is not valid." })
        let token = jwt.sign(
            {
                authorId: author._id.toString(),
                name: "developer",
                organisation: "EA development"
            },
            "Blogging-sitr"
        );
        return res.status(201).send({ status: true, token: token })
    }
    catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}





module.exports.createAuthor = createAuthor
module.exports.authorLogin = authorLogin;