import { prisma } from "../utils/db.js";

export function createOtp (userId, otp, expiredAt) {
    return prisma.otp.create({
        data : {
            userId,
            otp, 
            isUsed: false,
            expiredAt,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    });
}

export function findValidOtp (userId, otp){
    return prisma.otp.findFirst({
        where : {
            userId,
            otp,
            isUsed: false,
            expiredAt: { gt: new Date()} // check if expiredAt is greater than current date
        }
    })
}

export function findActiveOtp (userId) {
    return prisma.otp.findFirst({
        where : {
            userId,
            isUsed: false,
            expiredAt: { gt: new Date()} // check if expiredAt is greater than current date
        }
    })
}