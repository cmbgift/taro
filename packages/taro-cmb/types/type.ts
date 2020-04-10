import Taro from '@tarojs/taro'

namespace Router {
  export interface Location {
    path: string;
    search: string;
    hash: string;
    state: {
      key: string;
    };
    params: {
      [key: string]: string;
    };
  }
  export interface RouterParams {
    path: string;
    scene: number;
    params: {
      [key: string]: string;
    };
    shareTicket: string;
    referrerInfo: Object;
  }
}

interface TaroCMB {
  _$router: Router.Location
  $router: Router.RouterParams
}

const TaroCMB: (TaroCMB & typeof Taro) = {} as any
export default TaroCMB
