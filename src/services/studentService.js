import prisma from "../config/prismaClient.js";

// Read operations
const getAllStudents = async () => {
  try {
    const students = await prisma.student.findMany();
    return students;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getByRollno = async (rollno) => {
  try {
    const student = await prisma.student.findUnique({
      where: {
        rollno: rollno,
      },
    });
    return student;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getByUserId = async (userId) => {
  try {
    const student = await prisma.student.findUnique({
      where: {
        userId: userId,
      },
    });
    return student;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getByStudentId = async (studentId) => {
  try {
    const student = await prisma.student.findUnique({
      where: {
        student_id: studentId,
      },
    });
    return student;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Create Operations
const createStudent = async (student) => {
  try {
    const newStudent = await prisma.student.create({
      data: student,
    });
    return newStudent;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Update Operations
const updateByRollno = async (rollno, student) => {
  try {
    const updatedStudent = await prisma.student.update({
      where: {
        rollno: rollno,
      },
      data: student,
    });
    return updatedStudent;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateByStudentId = async (studentId, student) => {
  try {
    const updatedStudent = await prisma.student.update({
      where: {
        student_id: studentId,
      },
      data: student,
    });
    return updatedStudent;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Delete Operations
const deleteByRollno = async (rollno) => {
  try {
    const deletedStudent = await prisma.student.delete({
      where: {
        rollno: rollno,
      },
    });
    return deletedStudent;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteByStudentId = async (studentId) => {
  try {
    const deletedStudent = await prisma.student.delete({
      where: {
        student_id: studentId,
      },
    });
    return deletedStudent;
  } catch (error) {
    throw new Error(error.message);
  }
};


export default {
  createStudent,
  getAllStudents,
  getByRollno,
  getByUserId,
  getByStudentId,
  updateByRollno,
  updateByStudentId,
  deleteByRollno,
  deleteByStudentId,
};
