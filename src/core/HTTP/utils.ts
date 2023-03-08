type TData = { [key: string]: unknown }

export const queryStringify = (data: TData): string =>
  `?${Object.entries(data)
    .map((param) => param.join('='))
    .join('&')}`
