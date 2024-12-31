import prisma from "../config/prismaClient.js";

const getAllDrives = async () => {
  try {
    const drives = await prisma.drive.findMany();
    return drives;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getDriveById = async (id) => {
  try {
    const drive = await prisma.drive.findUnique({ where: { drive_id: id } });
    return drive;
  } catch (error) {
    throw new Error(error.message);
  }
};

const addDrive = async (drive) => {
  try {
    const newDrive = await prisma.drive.create({ data: drive });
    return newDrive;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateDrive = async (id, drive) => {
  try {
    const updatedDrive = await prisma.drive.update({
      where: { drive_id: id },
      data: drive,
    });
    return updatedDrive;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteDrive = async (id) => {
  try {
    const deletedDrive = await prisma.drive.delete({ where: { drive_id: id } });
    return deletedDrive;
  } catch (error) {
    throw new Error(error.message);
  }
};


export default {
    getAllDrives,
    getDriveById,
    addDrive,
    updateDrive,
    deleteDrive
};