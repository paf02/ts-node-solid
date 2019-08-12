export default function to(promise): any {
    return promise
        .then((resp: any) => [null, resp])
        .catch((error: any) => [error]);
}