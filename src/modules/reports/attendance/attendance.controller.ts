import { Request, Response } from "express";

import { successResponse } from "../../../utils/response";

import { createAttendanceSchema } from "./attendance.validation";
import { attendanceService } from "./attendance.service";

export class AttendanceController {

  create = async (
    req: Request,
    res: Response
  ) => {

    const dto =
      createAttendanceSchema.parse(req.body);

    const attendance =
      await attendanceService.create(
        req.user.id,
        dto
      );

    return successResponse(
      res,{
        attendance_id: attendance.id,
        client_report_id: attendance.clientReportId,
      },
      "Attendance berhasil dikirim",
      201
    );
  };
}

export const attendanceController =
  new AttendanceController();