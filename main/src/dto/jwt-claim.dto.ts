export class JwtClaimDto {
  id!: string;
  username!: string;
  permissionIds!: string[];
  roleId!: string;

  constructor(id: string, username: string, permissionIds: string[], roleId: string) {
    this.id = id;
    this.username = username;
    this.permissionIds = permissionIds;
    this.roleId = roleId;
  }
}
