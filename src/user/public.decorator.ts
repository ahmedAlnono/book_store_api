import { SetMetadata } from '@nestjs/common';

export const Public = () => SetMetadata('noAuth', true);
