/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

/*
 * NOTICE: Do not edit this file manually.
 * This file is automatically generated by the OpenAPI Generator, @kbn/openapi-generator.
 *
 * info:
 *   title: Isolate Schema
 *   version: 2023-10-31
 */

import { z } from '@kbn/zod';

import { BaseActionSchema } from '../../../model/schema/common.gen';

export type IsolateRouteResponse = z.infer<typeof IsolateRouteResponse>;
export const IsolateRouteResponse = z.object({});

export type EndpointIsolateActionRequestBody = z.infer<typeof EndpointIsolateActionRequestBody>;
export const EndpointIsolateActionRequestBody = BaseActionSchema;
export type EndpointIsolateActionRequestBodyInput = z.input<
  typeof EndpointIsolateActionRequestBody
>;

export type EndpointIsolateActionResponse = z.infer<typeof EndpointIsolateActionResponse>;
export const EndpointIsolateActionResponse = IsolateRouteResponse;
