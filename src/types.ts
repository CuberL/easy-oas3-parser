import { BaseNode } from "./parse";

export type SupportedDataTypeNames = 'string' | 'boolean' | 'number' | 'null' | 'array' | 'oneOf' | 'anyOf' | 'object' | 'unknown';
export type ObjectGetFunction = (path: string) => BaseNode

export interface OAS3NumberSchema {
    exclusiveMinimum: boolean | null
    exclusiveMaximum: boolean | null
    minimum: number | null
    maximum: number | null
    multipleOf: number | null
}

export interface OAS3StringSchema {
    minLength: number | null
    maxLength: number | null
    format: string | null
    pattern: string | null
}

export interface OAS3ArraySchema {
    uniqueItems: boolean
}

export interface OAS3ObjectSchema {
    required: string[]
}
