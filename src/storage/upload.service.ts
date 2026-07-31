import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

import { AppError } from "../exceptions/AppError";

export class UploadService {
  private readonly uploadRoot: string;

  constructor() {
    this.uploadRoot = path.join(process.cwd(), "uploads");
  }

  /**
   * Simpan foto attendance
   */
  async saveAttendancePhoto(
    originalFileName: string,
    mimeType: string,
    base64: string
  ): Promise<string> {
    this.validateMimeType(mimeType);

    const extension = this.getExtension(mimeType);

    const directory = path.join(
      this.uploadRoot,
      "attendance"
    );

    await fs.mkdir(directory, {
      recursive: true,
    });

    const filename =
      this.generateFilename(extension);

    const filePath = path.join(
      directory,
      filename
    );

    const imageBuffer =
      this.decodeBase64(base64);

    await fs.writeFile(
      filePath,
      imageBuffer
    );

    return path.join(
      "uploads",
      "attendance",
      filename
    ).replace(/\\/g, "/");
  }

  /**
   * Decode Base64
   */
  private decodeBase64(
    base64: string
  ): Buffer {

     if (!base64) {
        throw new AppError(
            "Base64 kosong",
            400
        );
    }

    const payload = base64.replace(
        /^data:image\/[a-zA-Z]+;base64,/,
        ""
    );

    const buffer = Buffer.from(
        payload,
        "base64"
    );

    if (buffer.length === 0) {
        throw new AppError(
            "Base64 tidak valid",
            400
        );
    }

    return buffer;
  }

  /**
   * Generate nama file unik
   */
  private generateFilename(
    extension: string
  ): string {

    const random =
      crypto.randomUUID();

    const timestamp =
      Date.now();

    return `${timestamp}_${random}.${extension}`;
  }

  /**
   * Validasi MIME
   */
  private validateMimeType(
    mimeType: string
  ) {

    const allowed = [
      "image/jpeg",
      "image/png",
    ];

    if (!allowed.includes(mimeType)) {
      throw new AppError(
        "Format gambar tidak didukung",
        400
      );
    }
  }

  /**
   * MIME -> Extension
   */
  private getExtension(
    mimeType: string
  ): string {

    switch (mimeType) {

      case "image/jpeg":
        return "jpg";

      case "image/png":
        return "png";

      default:
        throw new AppError(
          "Mime type tidak didukung",
          400
        );
    }
  }
}

export const uploadService =
  new UploadService();