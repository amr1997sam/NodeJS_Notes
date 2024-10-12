const express = require('express');
const router = express.Router();
const Page = require('../models/page.model.js')

// get homepage
router.get('/', async function(req, res){
    const locals = {
        title: "AlMufakkirah - Home",
    }
    res.render('index', locals);
});

// get about page
router.get('/about', async function(req, res){
    const locals = {
        title: "AlMufakkirah - About",
    }
    res.render('about', locals);
});

// get binder page - contains all the books - and maybe pages of books
router.get('/binder', async function(req, res){
    const locals = {
        title: "AlMufakkirah - Binder",
    }
    res.render('binder', {layout: './layouts/note', locals});
});

// get some book page - it might change cuz there will be multiple books
router.get('/book', async function(req, res){
    const locals = {
        title: "AlMufakkirah - Book",
    }
    res.render('book', {layout: './layouts/note', locals});
});

// post pages to your notes
router.post('/notes/pages', async function(req, res){
    try {
        const page = await Page.create(req.body);
        res.status(200).json(page);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

// view all pages of your notes
router.get('/notes/pages', async function(req, res){
    try {
        const pages = await Page.find({});
        res.status(200).json(pages);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

// view a specific page of your notes
router.get('/notes/pages/:id', async function(req, res){
    const locals = {
        title: "AlMufakkirah - Binder",
    }
    
    try {
        const {id} = req.params;
        const page = await Page.findById(id);
        
        if(!page){
            return res.status(404).json({message: "Page Not Found!"});
        }
        
        res.render('pages', {layout: './layouts/note', locals, page})
        // res.status(200).json(page);

    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

//update a page
router.put('/notes/pages/:id', async function(req, res){
    try {
        const {id} = req.params;
        const page = await Page.findByIdAndUpdate(id, req.body);

        if(!page){
            return res.status(404).json({message: "Page Not Found!"});
        }
        const updatedPage = await Page.findById(id);
        res.status(200).json(updatedPage)

    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

// delete a page
router.delete('/notes/pages/:id', async function(req, res){
    try {
        const {id} = req.params;
        const page = await Page.findByIdAndDelete(id);

        if(!page){
            return res.status(404).json({message: "Page Not Found!"});
        }
        
        res.status(200).json({message: "Page Deleted Successfully!"})

    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

module.exports = router;