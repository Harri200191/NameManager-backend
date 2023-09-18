const express = require("express");
const task_model = require("../model/task_model");
const fs = require('fs/promises'); 
const {getflagFilePath} = require("../middlewares/TrackDeletion")

// Create a new task and add it to DB
const createTask = async (req, resp) => {
    try{
        const task = await task_model.create(req.body);
        resp.status(200).json(task);
    }
    catch(error){
        resp.status(500).json({
            msg: error.message
        })
    };
};

// Return all the tasks in a DB 
const getTasks = async (req, resp) => {
    try{
        const task = await task_model.find();
        resp.status(200).json(task);
    }
    catch (error){
        resp.status(500).json({
            msg: error.message
        });
    }
};

// GEt a single task by ID
const getTask = async (req, resp) => {
    try{
        const {id} = req.params;
        const task = await task_model.findById(id);

        if (!task){
            return resp.status(404).json(`NO TASK WITH THIS ID: ${id}`);
        };

        resp.status(200).json(task);
    }
    catch (error){
        resp.status(500).json({
            msg: error.message
        });
    }
};

// Delete a task from the DB
const deleteTask = async (req, resp) => {
    try{
        const {id} = req.params;
        const task = await task_model.findByIdAndDelete(id);

        if (!task){
            return resp.status(404).json(`NO TASK WITH THIS ID: ${id}`);
        };

        resp.status(200).json("TASK DELETED SUCCSFULLY");
    }
    catch (error){
        resp.status(500).json({
            msg: error.message
        });
    }
};

// Update a task from the DB
const UpdateTask = async (req, resp) => {
    try{
        const {id} = req.params;
        const task = await task_model.findByIdAndUpdate(
            {_id: id},
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!task){
            return resp.status(404).json(`NO TASK WITH THIS ID: ${id}`);
        };

        resp.status(200).json(task);
    }
    catch (error){
        resp.status(500).json({
            msg: error.message
        });
    }
};

// Update a single field in a task from the DB
const UpdateTaskSingleField = async (req, resp) => {
    try{
        const {id} = req.params;
        const task = await task_model.findByIdAndUpdate(
            {_id: id},
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!task){
            return resp.status(404).json(`NO TASK WITH THIS ID: ${id}`);
        };

        resp.status(200).json(task);
    }
    catch (error){
        resp.status(500).json({
            msg: error.message
        });
    }
};





const getDataFromName = async (req, resp) => {
    
    try{
        const {name} = req.query;
        const task = await task_model.find({ name: { $regex: name, $options: 'i' } });

        if (!task){
            return resp.status(404).json(`NO TASK WITH THIS NAME: ${name}`);
        };

        resp.status(200).json(task);
    }
    catch (error){
        resp.status(500).json({
            msg: error.message
        });
    }
};


const ClearDB = async (req, res) => {
    try {
        await task_model.deleteMany({});
        res.status(200).json({ message: 'Database cleared successfully.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while clearing the database.' });
    }
}


module.exports = {
    createTask: createTask,
    getTasks: getTasks,
    getTask: getTask,
    deleteTask: deleteTask,
    UpdateTask: UpdateTask,
    UpdateTaskSingleField: UpdateTaskSingleField,
    getDataFromName: getDataFromName,
    ClearDB: ClearDB
};