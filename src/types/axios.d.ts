/* import axios from "axios";

declare module "axios" {
  export type AxiosResponse<T = any> = Promise<T>;
}
 */

// axios.d.ts
import axios from 'axios'

declare module 'axios' {
  interface AxiosInstance {
    (config: AxiosRequestConfig): Promise<any>
  }
}
