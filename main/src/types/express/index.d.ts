import { JwtClaimDto } from '@/dto/jwt-claim.dto';

declare global {
  namespace Express {
    interface Request {
      user?: JwtClaimDto;
    }
  }
}
