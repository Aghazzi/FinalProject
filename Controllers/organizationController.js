// import Organization from "../Models/organizationModel.js";

// export const createOrganization = async (req, res) => {
//     try {
//         const organization = await Organization.create(req.body);
//         return res.status(201).json({
//             message: "Organization created successfully",
//             organization,
//         });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: error.message });
//     }
// };

// export const getOrganizations = async (req, res) => {
//     try {
//         const organizations = await Organization.find();
//         return res.status(200).json(organizations);
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: error.message });
//     }
// };

// export const getOrganizationsPagination = async (req, res) => {
//     const { page = 1, limit = 5 } = req.query;

//     try {
//         const options = {
//             page: parseInt(page),
//             limit: parseInt(limit),
//             sort: { createdAt: -1 },
//         };

//         const result = await Organization.paginate(options);

//         const { docs, totalDocs, totalPages, hasNextPage, nextPage } = result;

//         const adjustedLimit =
//             page < totalPages ? options.limit : totalDocs % options.limit;

//         const pagination = {
//             totalDocs,
//             limit: adjustedLimit,
//             totalPages,
//             page: options.page,
//             hasNextPage,
//             nextPage: hasNextPage
//                 ? `${req.baseUrl}/organizations?page=${nextPage}&limit=${limit}`
//                 : null,
//         };

//         return res.status(200).json({ organizations: docs, pagination });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: error.message });
//     }
// };

// export const getOrganizationById = async (req, res) => {
//     const { id } = req.params;

//     try {
//         const organization = await Organization.findById(id);
//         if (!organization) {
//             return res.status(404).json({ message: "Organization not found" });
//         }
//         return res.status(200).json(organization);
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: error.message });
//     }
// };

// export const updateOrganization = async (req, res) => {
//     const { id } = req.params;

//     try {
//         const organization = await Organization.findByIdAndUpdate(
//             id,
//             req.body,
//             { new: true }
//         );
//         if (!organization) {
//             return res.status(404).json({ message: "Organization not found" });
//         }
//         return res.status(200).json(organization);
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: error.message });
//     }
// };

// export const deleteOrganization = async (req, res) => {
//     const { id } = req.params;

//     try {
//         const organization = await Organization.findByIdAndDelete(id);
//         if (!organization) {
//             return res.status(404).json({ message: "Organization not found" });
//         }
//         return res
//             .status(200)
//             .json({ message: "Organization deleted successfully" });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: error.message });
//     }
// };

// const OrganizationController = {
//     createOrganization,
//     deleteOrganization,
//     getOrganizationById,
//     getOrganizations,
//     updateOrganization,
//     getOrganizationsPagination,
// };
// export default OrganizationController;
