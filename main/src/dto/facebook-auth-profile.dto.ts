/**
     User data: {
        id: '',
        email: '',
        name: '',
        picture: {
            data: {
            height: 50,
            is_silhouette: false,
            url: '',
            width: 50
            }
        }
    }
**/
export class FacebookAuthProfileDto {
  id!: string;
  email?: string;
  name!: string;
  picture?: {
    data: {
      height: number;
      is_silhouette: boolean;
      url: string;
      width: number;
    };
  };
}
