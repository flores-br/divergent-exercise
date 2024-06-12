/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Mutation = {
  __typename?: 'Mutation';
  createWarehouse: Warehouse;
};


export type MutationCreateWarehouseArgs = {
  input: WarehouseInput;
};

export type Query = {
  __typename?: 'Query';
  warehouses: Array<Warehouse>;
};

export type Shelf = {
  __typename?: 'Shelf';
  name: Scalars['String']['output'];
};

export type ShelfInput = {
  name: Scalars['String']['input'];
};

export type Warehouse = {
  __typename?: 'Warehouse';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  zones: Array<Zone>;
};

export type WarehouseInput = {
  name: Scalars['String']['input'];
  zones: Array<ZoneInput>;
};

export type Zone = {
  __typename?: 'Zone';
  id: Scalars['ID']['output'];
  shelves: Array<Shelf>;
  zoneNumber: Scalars['Int']['output'];
};

export type ZoneInput = {
  shelves: Array<ShelfInput>;
  zoneNumber: Scalars['Int']['input'];
};

export type CreateWarehouseMutationVariables = Exact<{
  input: WarehouseInput;
}>;


export type CreateWarehouseMutation = { __typename?: 'Mutation', createWarehouse: { __typename?: 'Warehouse', name: string, zones: Array<{ __typename?: 'Zone', zoneNumber: number, shelves: Array<{ __typename?: 'Shelf', name: string }> }> } };

export type GetWarehousesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetWarehousesQuery = { __typename?: 'Query', warehouses: Array<{ __typename?: 'Warehouse', id: string, name: string, zones: Array<{ __typename?: 'Zone', id: string, zoneNumber: number, shelves: Array<{ __typename?: 'Shelf', name: string }> }> }> };


export const CreateWarehouseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateWarehouse"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"WarehouseInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createWarehouse"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"zones"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"zoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"shelves"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CreateWarehouseMutation, CreateWarehouseMutationVariables>;
export const GetWarehousesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetWarehouses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"warehouses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"zones"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"zoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"shelves"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetWarehousesQuery, GetWarehousesQueryVariables>;