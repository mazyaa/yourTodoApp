import { prisma } from "../utils/db.js";


export function createUser (payload) {
    return prisma.user.create({
        data : {
            name: payload.name,
            email: payload.email,
            password: payload.password,
            role: 'USER',
            verified: false,
            otp: {
                create: {
                    otp: payload.otp,
                    expiredAt: payload.expiredAt,
                    updatedAt: new Date()
                }
            }
        }
    });
}

export function getUserById (userId) {
    return prisma.user.findUnique({
        where: {
            id: userId
        }
    });
}

export function getUserByEmail (email) {
    return prisma.user.findUnique({
        where: {
            email: email
        }
    });
}

export function updateRefreshToken (userId, refreshToken) {
    return prisma.user.update({
        where: {
            id: userId
        },
        data: {
            refreshToken
        }
    });
}

export function getUserByRefreshToken (refreshToken) {
    return prisma.user.findFirst({
        where: {
            refreshToken
        }
    });
}

export function updateUserVerificationAndMarkOtpAsUsed (userId, otpId) {
    return prisma.user.update({
        where: {
            id: userId
        },
        data: {
            verified: true,
            otp: {
                update: {
                    where: {
                        id: otpId
                    },
                    data: {
                        isUsed: true
                    }
                }
            },
            notifications: {
                create: {
                    title: 'Registration Successfully',
                    message: 'Welcome to Your Todo App!',
                }
            }
        }
    });
}

export function updateUserById (userId, payload) {
    return prisma.user.update({
        where: {
            id: userId
        },
        data: {
            email: payload.email,
            name: payload.name,
            password: payload.password
        }
    })
}

export function deleteUserById (userId) {
    return prisma.user.delete({
        where: {
            id: userId
        }
    })
}