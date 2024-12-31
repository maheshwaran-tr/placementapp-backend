import prisma from "../config/prismaClient.js";

const allStaffs = async () => {
  try {
    const staffs = await prisma.staff.findMany();
    return staffs;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getByStaffId = async (id) => {
  try {
    const staff = await prisma.staff.findUnique({
      where: {
        staff_id: id,
      },
    });
    return staff;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getByUserId = async (id) => {
  try {
    const staff = await prisma.staff.findUnique({
      where: {
        user_id: id,
      },
    });
    return staff;
  } catch (error) {
    throw new Error(error.message);
  }
};

const createStaff = async (staff) => {
  try {
    const newStaff = await prisma.staff.create({
      data: staff,
    });
    return newStaff;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateByStaffId = async (id, staff) => {
  try {
    const updatedStaff = await prisma.staff.update({
      where: {
        staff_id: id,
      },
      data: staff,
    });
    return updatedStaff;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteByStaffId = async (id) => {
  try {
    const deletedStaff = await prisma.staff.delete({
      where: {
        staff_id: id,
      },
    });
    return deletedStaff;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default {
  allStaffs,
  getByStaffId,
  getByUserId,
  createStaff,
  updateByStaffId,
  deleteByStaffId,
};