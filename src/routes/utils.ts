import { Response } from "express";

export type SuccessResponseWrapper<T = null> = {
  success: true;
  error: false;
  data: T;
};

export type ErrorResponseWrapper<T = null> = {
  success: false;
  error: {
    message: string;
    stack?: string;
  };
  metaData?: T;
};

export type WrapperResponse<T = null> = Response<
  {},
  SuccessResponseWrapper<T> | ErrorResponseWrapper<T>
>;

export const responseWrapper = async <T>(
  fn: () => Promise<T>,
  res: Response<SuccessResponseWrapper<T> | ErrorResponseWrapper>
) => {
  try {
    const response = await fn();
    //@ts-ignore
    res.send(successResponse(response ?? null));
  } catch (error) {
    res.send(
      errorResponse({
        //@ts-ignore
        errorMsg: error.msg,
        //@ts-ignore
        stack: error.stack,
      })
    );
  }
};

export const successResponse = <T>(data: T): SuccessResponseWrapper<T> => ({
  success: true,
  error: false,
  data: data,
});

export const errorResponse = <T = null>({
  errorMsg,
  stack,
  metaData,
}: {
  errorMsg: string;
  stack?: string;
  metaData?: T;
}): ErrorResponseWrapper<T> => ({
  success: false,
  error: {
    message: errorMsg,
    stack,
  },
  metaData,
});
