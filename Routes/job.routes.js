const express=require("express")
const { JobModel } = require("../models/job.model")
const jobRouter=express.Router()


jobRouter.get("/",async(req,res)=>{
    const {role,language}=req.query
    let query={}
    if(role){
        query.role=role
    }
    if(language){
        query.language=language
    }
    try {
        const jobData=await JobModel.find(query)
        res.status(200).send(jobData)
    } catch (error) {
        res.status(400).send({msg:error.message})
    }
})

jobRouter.post("/create",async(req,res)=>{
    try {
       const postedAt=new Date().toLocaleDateString()
       req.body["postedAt"]=postedAt
       const post =await JobModel(req.body)
       await post.save()
       res.status(200).send({msg:"new job post has been added"})
    } catch (error) {
        res.status(400).send({msg:error.message})
    }
})

module.exports={
    jobRouter
}