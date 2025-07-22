export class ApiResponse {
  static success(data: any, message: string = 'Success') {
    return {
      success: true,
      message,
      data
    };
  }

  static error(message: string, errors?: any) {
    return {
      success: false,
      message,
      errors
    };
  }

  static paginated(data: any[], total: number, page: number, limit: number) {
    return {
      success: true,
      data,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    };
  }
}