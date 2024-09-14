import Task from "../models/task.model.js"

const createTask = async(req, res) => {
    try {
        const {title, description, dueDate, category} = req.body;
        const id = req.user._id

        if (!title) {
            return res.status(400).json("Title can not be blank");
        }

        if (dueDate && isNaN(new Date(dueDate).getTime())) {
            return res.status(400).json("Invalid due date");
        }

        const allowedCategories = ["work", "fitness", "shopping", "education"];

        if (category && !allowedCategories.includes(category)) {
            return res.status(400).json("Invalid Category");
        }

        const task = await Task.create({
            title,
            description,
            user: id,
            dueDate: dueDate ? new Date(dueDate) : null,
            category: category || 'work'
        })

        return res.status(200).json(task);
    } catch (error) {
        console.log("Error in task create controller", error);
        return res.status(500).json(error)
    }
}

const updateTask = async(req, res) => {
    try {
        const {title, description, dueDate, category} = req.body
        const { id } = req.params

        const allowedCategories = ["work", "fitness", "shopping", "education"];

        if (category && !allowedCategories.includes(category)) {
            return res.status(400).json("Invalid Category");
        }

        const updateFields = {};
        if(title) updateFields.title = title;
        if(description) updateFields.description = description;
        if(dueDate){
            if (isNaN(new Date(dueDate).getTime())) {
                return res.status(400).json("Invalid due date");
            }
            updateFields.dueDate = dueDate;
        }
        if(category) updateFields.category = category;

        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json("Please provide at least one field to update");
        }
        
        const task = await Task.findByIdAndUpdate( id, { $set: updateFields }, {new:true})

        return res.status(200).json(task)
    } catch (error) {
        console.log("Error in update task controller", error);
        return res.status(500).json(error)
    }
}

const deleteTask = async(req, res) => {
    try {
        const {id} = req.params;

        const deletedTask = await Task.findByIdAndDelete(id);

        if (!deletedTask) {
            return res.status(404).json("Task not found");
        }

        return res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        console.log("Error in task delete controller", error);
        return res.status(500).json(error)
    }
}

const toggleTask = async(req, res) => {
    try {
        const {id} = req.params

        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json("Task not found");
        }

        const toggleTask = await Task.findByIdAndUpdate(
            id,
            {
                $set: {
                    completed: !task.completed
                }
            },
            {new:true}
        )

        return res.status(200).json(toggleTask)
    } catch (error) {
        console.log("Error in toggle task controller", error);
        return res.status(500).json(error)
    }
}

const allTask = async(req, res) => {
    try {
        const userId = req.user._id;
        
        const tasks = await Task.find({
            user: userId
        })

        if (tasks.length === 0) {
            return res.status(200).json("No tasks has been created yet");
        }

        return res.status(200).json(tasks)
    } catch (error) {
        console.log("Error in get controller", error);
        return res.status(500).json(error)
    }
}

export {
    createTask,
    updateTask,
    deleteTask,
    toggleTask,
    allTask
}