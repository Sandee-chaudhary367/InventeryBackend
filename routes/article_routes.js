const express = require('express');
const article=require("../models/article")

const router=new express.Router();

router.get("/getArticleById/:id",async (req,res)=>{
    try {
        //console.log(req.params.id);
        const id=req.params.id;
        const articeByIdObject= await article.findOne({_id:id})
        //console.log(articeByIdObject)
        res.json(articeByIdObject);
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
    
})

router.get("/getArticle",async (req,res)=>{
    try {
        const articeByrRegionObject= await article.find().limit(10);
       // console.log(articeByrRegionObject)
        res.json(articeByrRegionObject);
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
    
})

// router.get("/getSorting",async (req,res)=>{
//     try {
//         const articeByrRegionObject= await article.find().limit(10);
//        // console.log(articeByrRegionObject)
//         res.json(articeByrRegionObject);
//     } catch (e) {
//         console.log(e);
//         res.status(400).send(e);
//     }
    
// })




router.post("/getFilteredData",async (req,res)=>{
    try {
        console.log(req.body.FilterValue);
        let arr=req.body.FilterValue.split("/");
        let fld=[];
         if(arr[0]!==""){
            fld.push({"topic":arr[0]})
         }
         if(arr[1]!==""){
            fld.push({"sector":arr[1]})
         }
         if(arr[2]!==""){
            fld.push({"region":arr[2]})
         }
         if(arr[3]!==""){
            fld.push({"country":arr[3]})
         }
         if(arr[4]!==""){
            fld.push({"source":arr[4]})
         }
         if(arr[5]!==""){
            fld.push({"end_year": { '$eq':parseInt(arr[5])}})
         }
         console.log(fld);
        
        const FilteredDataObject= await article.find(fld.length===0?{}:{$and:fld}).limit(10);
        console.log(FilteredDataObject)
        res.json(FilteredDataObject);
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
    
})

router.post("/getPieData",async (req,res)=>{
    try {
        let obj="$"+req.body.name.toLowerCase();
       // console.log(obj);
        const FilteredDataCount= await (await article.aggregate([{"$group": {"_id":obj, "count":{"$sum": 1}}}])).sort((a,b)=>b.count-a.count).filter(a=>a._id!=="").slice(0,6)
       console.log(FilteredDataCount)
        res.json(FilteredDataCount);
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
    
})

router.post("/getCount",async (req,res)=>{
    try {
        let obj=req.body
        const FilteredDataCount= await article.find(obj).count();
       // console.log(FilteredDataCount)
        res.json(FilteredDataCount);
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
    
})

router.get("/getDistinctValue",async (req,res)=>{
    try {
        const DistinctTopicsObject= await article.distinct("topic");
        const DistinctSectorObject= await article.distinct("sector");
        const DistinctCountryObject= await article.distinct("country");
        const DistinctRegionObject= await article.distinct("region");
        const DistinctSourceObject= await article.distinct("source");
        const DistinctEndYearObject= await article.distinct("end_year");

        const distinct={topic:DistinctTopicsObject,sector:DistinctSectorObject,region:DistinctRegionObject,
            country:DistinctCountryObject,source:DistinctSourceObject,end_year:DistinctEndYearObject};
        
        //console.log(distinct)
        res.json(distinct);
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
    
})

module.exports=router