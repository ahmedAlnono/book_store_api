import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const NoAuth = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    request.noAuth = true;
    return request;
  },
);
