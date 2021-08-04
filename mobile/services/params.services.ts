import { IParams } from "./../types/IParams";

export const urlHandler = (params: IParams) => {

  let paramsString: Array<string> = [];

  for (const [key, value] of Object.entries(params)) {
    if (key === "page") {
      paramsString.push(`${key}=${value}`);
    } else if (key === "reset" && value === true) {
      paramsString = [];
      break;
    } else if (key === "reset" && value === false) {
      paramsString.push();
    } else if (key === "title" && value === "") {
      paramsString.push();
    } else if (key === "isPrivate" && value === true) {
      paramsString.push(`isPublic=${!value}`);
    } else if (key === "isPublic" && value === true && !paramsString.includes("isPublic=false")) {
      paramsString.push(`${key}=${value}`);
    } else if (key === "isNotCompleted" && value === true) {
      paramsString.push(`isCompleted=${!value}`);
    } else if (key === "isCompleted" && value === true && !paramsString.includes("isCompleted=false")) {
      paramsString.push(`${key}=${value}`);
    }
  }

  return paramsString.join("&");
};

/*

*/

/*
  page: number;
  title: string;
  reset: boolean;
  isPublic: boolean;
  isPrivate: boolean;
  isCompleted: boolean;
  isNotCompleted: boolean;
*/