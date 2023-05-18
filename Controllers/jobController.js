import Job from "../Models/jobModel.js";
import User from "../Models/userModel.js";

// Get all jobs
export const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find();
        return res.status(200).json(jobs);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};

// Get a job by ID
export const getJobById = async (req, res) => {
    const { id } = req.params;

    try {
        const job = await Job.findById(id);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }
        return res.status(200).json(job);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};

// Get Paginated job
export const getJobPagination = async (req, res) => {
    const { page = 1, limit = 5 } = req.query;
    try {
        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            sort: { createdAt: -1 },
        };

        const result = await Job.paginate({}, options);

        const { docs, totalDocs, totalPages, hasNextPage, nextPage } = result;
        const adjustedLimit =
            page < totalPages ? options.limit : totalDocs % options.limit;

        const pagination = {
            totalDocs,
            limit: adjustedLimit,
            totalPages,
            page: options.page,
            hasNextPage,
            nextPage: hasNextPage
                ? `${req.baseUrl}/jobs?page=${nextPage}&limit=${limit}`
                : null,
        };

        return res.status(200).json({ jobs: docs, pagination });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};

// Create a new job
export const createJob = async (req, res) => {
    const {
        title,
        description,
        startDate,
        endDate,
        requiredSkills,
        status,
        schedule,
        nbOfVolunteers,
        volunteers,
        orgId,
    } = req.body;

    try {
        console.log(requiredSkills);
        console.log(typeof requiredSkills);
        const job = await Job.create({
            title,
            description,
            startDate,
            endDate,
            requiredSkills,
            status,
            schedule,
            nbOfVolunteers,
            volunteers,
            orgId,
        });
        const org = await User.findById(orgId);
        if (!org) {
            return res.status(404).json({ message: "Organization not found" });
        }
        org.appliedJobs.push(job._id);
        await org.save();
        return res
            .status(201)
            .json({ message: "Job created Successfully", job });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};

// Update a job
export const updateJob = async (req, res) => {
    const { id } = req.params;
    const {
        title,
        description,
        startDate,
        endDate,
        requiredSkills,
        status,
        schedule,
        nbOfVolunteers,
    } = req.body;

    try {
        const job = await Job.findByIdAndUpdate(
            id,
            {
                title,
                description,
                startDate,
                endDate,
                requiredSkills,
                status,
                schedule,
                nbOfVolunteers,
            },
            { new: true }
        );

        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        return res.status(200).json(job);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};

// Delete a job
export const deleteJob = async (req, res) => {
    const { id } = req.params;

    try {
        const job = await Job.findByIdAndDelete(id);

        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        // Remove the job from the associated users' volunteer list
        await User.updateMany(
            { _id: { $in: job.volunteers } },
            { $pull: { jobs: id } }
        );

        return res.status(200).json({ message: "Job deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};

const JobController = {
    getJobs,
    getJobById,
    createJob,
    updateJob,
    deleteJob,
    getJobPagination,
};
export default JobController;
