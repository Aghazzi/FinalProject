import User from "../Models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Register //
export const register = async (req, res) => {
    const {
        email,
        password,
        firstName,
        lastName,
        country,
        city,
        skills,
        experience,
        interests,
        role,
        newsResources,
        contactPersonEmail,
        contactPersonPhone,
        contactPersonName,
        orgName,
        description,
        website,
    } = req.body;

    try {
        const existingUser = await User.findOne({
            email,
        });

        if (existingUser) {
            return res.status(409).json({ message: "email already exists" });
        }
        const newUser = new User({
            email,
            password,
            country,
            city,
            role,
        });
        if (role === "User" || role === "Admin") {
            newUser.firstName = firstName;
            newUser.lastName = lastName;
            skills ? (newUser.skills = skills) : null;
            experience ? (newUser.experience = experience) : null;
            interests ? (newUser.interests = interests) : null;
        } else if (role === "Org") {
            newUser.orgName = orgName;
            newUser.newsResources = newsResources;
            newUser.contactPersonEmail = contactPersonEmail;
            newUser.contactPersonPhone = contactPersonPhone;
            newUser.contactPersonName = contactPersonName;
            description ? (newUser.description = description) : null;
            website ? (newUser.website = website) : null;
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newUser.password, salt);
        newUser.password = hashedPassword;
        await newUser.validate();
        const user = await newUser.save();
        const { password: removedPassword, ...returnUser } = user._doc;
        return res
            .status(201)
            .json({ message: "Registration successful", user: returnUser });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};

// log in //
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email }).select("password");
        console.log(user);
        if (!user) {
            return res.status(404).json({ message: "email not found" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 60 * 60 * 1000,
        });
        return res.status(200).json({ message: "Login successful" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};

// get all users //
export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};

// get users by id //
export const getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};

// update users //
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const user = await User.findByIdAndUpdate(id, updates, {
            new: true,
            runValidators: true,
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};

// delete users //
export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};

// get paginated organizations //
export const getOrganizationsPagination = async (req, res) => {
    const { page = 1, limit = 5 } = req.query;

    try {
        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            sort: { createdAt: -1 },
        };

        const query = { role: "Org" };

        const result = await User.paginate(query, options);

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
                ? `${req.baseUrl}/organizations?page=${nextPage}&limit=${limit}`
                : null,
        };

        return res.status(200).json({ organizations: docs, pagination });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};

// get paginated Users //
export const getUsersPagination = async (req, res) => {
    const { page = 1, limit = 5 } = req.query;

    try {
        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            sort: { createdAt: -1 },
        };

        const query = { role: "User" };

        const result = await User.paginate(query, options);

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
                ? `${req.baseUrl}/users?page=${nextPage}&limit=${limit}`
                : null,
        };

        return res.status(200).json({ users: docs, pagination });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};

const UserController = {
    login,
    register,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    getOrganizationsPagination,
    getUsersPagination,
};
export default UserController;
