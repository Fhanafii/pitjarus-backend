import { Prisma, PrismaClient } from "@prisma/client";

import { prisma } from "../../../config/prisma";

export class AttendanceRepository {
  /**
   * Digunakan untuk mengecek apakah client_report_id
   * sudah pernah dikirim sebelumnya.
   */
  async findByClientReportId(clientReportId: string) {
    return prisma.attendanceReport.findUnique({
      where: {
        clientReportId,
      },
    });
  }

  /**
   * Digunakan jika suatu saat membutuhkan detail attendance.
   */
  async findById(id: number) {
    return prisma.attendanceReport.findUnique({
      where: {
        id,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            fullName: true,
          },
        },
      },
    });
  }

  /**
   * Simpan attendance report.
   *
   * tx bersifat optional agar nanti bisa dipakai
   * baik di dalam transaction maupun di luar transaction.
   */
  async create(
    data: Prisma.AttendanceReportCreateInput,
    tx?: Prisma.TransactionClient
  ) {
    const db = tx ?? prisma;

    return db.attendanceReport.create({
      data,
    });
  }
}

export const attendanceRepository =
  new AttendanceRepository();