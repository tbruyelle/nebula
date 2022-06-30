/* eslint-disable */
import { Reader, util, configure, Writer } from "protobufjs/minimal";
import * as Long from "long";
import { Params } from "../sbt/params";
import {
  PageRequest,
  PageResponse,
} from "../cosmos/base/query/v1beta1/pagination";
import { Soul } from "../sbt/soul";

export const protobufPackage = "tbruyelle.nebula.sbt";

/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {}

/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  /** params holds all the parameters of this module. */
  params: Params | undefined;
}

export interface QuerySoulsRequest {
  creator: string;
  /** Adding pagination to request */
  pagination: PageRequest | undefined;
}

export interface QuerySoulsResponse {
  Soul: Soul[];
  /** Adding pagination to response */
  pagination: PageResponse | undefined;
}

export interface QuerySoulBoundsRequest {
  owner: string;
  /** Adding pagination to request */
  pagination: PageRequest | undefined;
}

export interface QuerySoulBoundsResponse {
  SoulBound: SoulBoundResponse[];
  /** Adding pagination to response */
  pagination: PageResponse | undefined;
}

export interface SoulBoundResponse {
  id: number;
  soulID: number;
  name: string;
  description: string;
  owner: string;
  boundAt: number;
  createdAt: number;
  creator: string;
}

const baseQueryParamsRequest: object = {};

export const QueryParamsRequest = {
  encode(_: QueryParamsRequest, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryParamsRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryParamsRequest } as QueryParamsRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): QueryParamsRequest {
    const message = { ...baseQueryParamsRequest } as QueryParamsRequest;
    return message;
  },

  toJSON(_: QueryParamsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<QueryParamsRequest>): QueryParamsRequest {
    const message = { ...baseQueryParamsRequest } as QueryParamsRequest;
    return message;
  },
};

const baseQueryParamsResponse: object = {};

export const QueryParamsResponse = {
  encode(
    message: QueryParamsResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryParamsResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryParamsResponse } as QueryParamsResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryParamsResponse {
    const message = { ...baseQueryParamsResponse } as QueryParamsResponse;
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromJSON(object.params);
    } else {
      message.params = undefined;
    }
    return message;
  },

  toJSON(message: QueryParamsResponse): unknown {
    const obj: any = {};
    message.params !== undefined &&
      (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryParamsResponse>): QueryParamsResponse {
    const message = { ...baseQueryParamsResponse } as QueryParamsResponse;
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromPartial(object.params);
    } else {
      message.params = undefined;
    }
    return message;
  },
};

const baseQuerySoulsRequest: object = { creator: "" };

export const QuerySoulsRequest = {
  encode(message: QuerySoulsRequest, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QuerySoulsRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQuerySoulsRequest } as QuerySoulsRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QuerySoulsRequest {
    const message = { ...baseQuerySoulsRequest } as QuerySoulsRequest;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QuerySoulsRequest): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QuerySoulsRequest>): QuerySoulsRequest {
    const message = { ...baseQuerySoulsRequest } as QuerySoulsRequest;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQuerySoulsResponse: object = {};

export const QuerySoulsResponse = {
  encode(
    message: QuerySoulsResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.Soul) {
      Soul.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QuerySoulsResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQuerySoulsResponse } as QuerySoulsResponse;
    message.Soul = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Soul.push(Soul.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QuerySoulsResponse {
    const message = { ...baseQuerySoulsResponse } as QuerySoulsResponse;
    message.Soul = [];
    if (object.Soul !== undefined && object.Soul !== null) {
      for (const e of object.Soul) {
        message.Soul.push(Soul.fromJSON(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QuerySoulsResponse): unknown {
    const obj: any = {};
    if (message.Soul) {
      obj.Soul = message.Soul.map((e) => (e ? Soul.toJSON(e) : undefined));
    } else {
      obj.Soul = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QuerySoulsResponse>): QuerySoulsResponse {
    const message = { ...baseQuerySoulsResponse } as QuerySoulsResponse;
    message.Soul = [];
    if (object.Soul !== undefined && object.Soul !== null) {
      for (const e of object.Soul) {
        message.Soul.push(Soul.fromPartial(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQuerySoulBoundsRequest: object = { owner: "" };

export const QuerySoulBoundsRequest = {
  encode(
    message: QuerySoulBoundsRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QuerySoulBoundsRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQuerySoulBoundsRequest } as QuerySoulBoundsRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.owner = reader.string();
          break;
        case 2:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QuerySoulBoundsRequest {
    const message = { ...baseQuerySoulBoundsRequest } as QuerySoulBoundsRequest;
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = String(object.owner);
    } else {
      message.owner = "";
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QuerySoulBoundsRequest): unknown {
    const obj: any = {};
    message.owner !== undefined && (obj.owner = message.owner);
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QuerySoulBoundsRequest>
  ): QuerySoulBoundsRequest {
    const message = { ...baseQuerySoulBoundsRequest } as QuerySoulBoundsRequest;
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = object.owner;
    } else {
      message.owner = "";
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQuerySoulBoundsResponse: object = {};

export const QuerySoulBoundsResponse = {
  encode(
    message: QuerySoulBoundsResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.SoulBound) {
      SoulBoundResponse.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QuerySoulBoundsResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQuerySoulBoundsResponse,
    } as QuerySoulBoundsResponse;
    message.SoulBound = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.SoulBound.push(
            SoulBoundResponse.decode(reader, reader.uint32())
          );
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QuerySoulBoundsResponse {
    const message = {
      ...baseQuerySoulBoundsResponse,
    } as QuerySoulBoundsResponse;
    message.SoulBound = [];
    if (object.SoulBound !== undefined && object.SoulBound !== null) {
      for (const e of object.SoulBound) {
        message.SoulBound.push(SoulBoundResponse.fromJSON(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QuerySoulBoundsResponse): unknown {
    const obj: any = {};
    if (message.SoulBound) {
      obj.SoulBound = message.SoulBound.map((e) =>
        e ? SoulBoundResponse.toJSON(e) : undefined
      );
    } else {
      obj.SoulBound = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QuerySoulBoundsResponse>
  ): QuerySoulBoundsResponse {
    const message = {
      ...baseQuerySoulBoundsResponse,
    } as QuerySoulBoundsResponse;
    message.SoulBound = [];
    if (object.SoulBound !== undefined && object.SoulBound !== null) {
      for (const e of object.SoulBound) {
        message.SoulBound.push(SoulBoundResponse.fromPartial(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseSoulBoundResponse: object = {
  id: 0,
  soulID: 0,
  name: "",
  description: "",
  owner: "",
  boundAt: 0,
  createdAt: 0,
  creator: "",
};

export const SoulBoundResponse = {
  encode(message: SoulBoundResponse, writer: Writer = Writer.create()): Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.soulID !== 0) {
      writer.uint32(16).uint64(message.soulID);
    }
    if (message.name !== "") {
      writer.uint32(26).string(message.name);
    }
    if (message.description !== "") {
      writer.uint32(34).string(message.description);
    }
    if (message.owner !== "") {
      writer.uint32(42).string(message.owner);
    }
    if (message.boundAt !== 0) {
      writer.uint32(48).int64(message.boundAt);
    }
    if (message.createdAt !== 0) {
      writer.uint32(56).int64(message.createdAt);
    }
    if (message.creator !== "") {
      writer.uint32(74).string(message.creator);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): SoulBoundResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSoulBoundResponse } as SoulBoundResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.soulID = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.name = reader.string();
          break;
        case 4:
          message.description = reader.string();
          break;
        case 5:
          message.owner = reader.string();
          break;
        case 6:
          message.boundAt = longToNumber(reader.int64() as Long);
          break;
        case 7:
          message.createdAt = longToNumber(reader.int64() as Long);
          break;
        case 9:
          message.creator = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SoulBoundResponse {
    const message = { ...baseSoulBoundResponse } as SoulBoundResponse;
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    if (object.soulID !== undefined && object.soulID !== null) {
      message.soulID = Number(object.soulID);
    } else {
      message.soulID = 0;
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = String(object.description);
    } else {
      message.description = "";
    }
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = String(object.owner);
    } else {
      message.owner = "";
    }
    if (object.boundAt !== undefined && object.boundAt !== null) {
      message.boundAt = Number(object.boundAt);
    } else {
      message.boundAt = 0;
    }
    if (object.createdAt !== undefined && object.createdAt !== null) {
      message.createdAt = Number(object.createdAt);
    } else {
      message.createdAt = 0;
    }
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    return message;
  },

  toJSON(message: SoulBoundResponse): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.soulID !== undefined && (obj.soulID = message.soulID);
    message.name !== undefined && (obj.name = message.name);
    message.description !== undefined &&
      (obj.description = message.description);
    message.owner !== undefined && (obj.owner = message.owner);
    message.boundAt !== undefined && (obj.boundAt = message.boundAt);
    message.createdAt !== undefined && (obj.createdAt = message.createdAt);
    message.creator !== undefined && (obj.creator = message.creator);
    return obj;
  },

  fromPartial(object: DeepPartial<SoulBoundResponse>): SoulBoundResponse {
    const message = { ...baseSoulBoundResponse } as SoulBoundResponse;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    if (object.soulID !== undefined && object.soulID !== null) {
      message.soulID = object.soulID;
    } else {
      message.soulID = 0;
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    } else {
      message.description = "";
    }
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = object.owner;
    } else {
      message.owner = "";
    }
    if (object.boundAt !== undefined && object.boundAt !== null) {
      message.boundAt = object.boundAt;
    } else {
      message.boundAt = 0;
    }
    if (object.createdAt !== undefined && object.createdAt !== null) {
      message.createdAt = object.createdAt;
    } else {
      message.createdAt = 0;
    }
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  /** Parameters queries the parameters of the module. */
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** Queries a list of Souls items. */
  Souls(request: QuerySoulsRequest): Promise<QuerySoulsResponse>;
  /** Queries a list of Soulbounds items. */
  Soulbounds(request: QuerySoulBoundsRequest): Promise<QuerySoulBoundsResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request(
      "tbruyelle.nebula.sbt.Query",
      "Params",
      data
    );
    return promise.then((data) => QueryParamsResponse.decode(new Reader(data)));
  }

  Souls(request: QuerySoulsRequest): Promise<QuerySoulsResponse> {
    const data = QuerySoulsRequest.encode(request).finish();
    const promise = this.rpc.request(
      "tbruyelle.nebula.sbt.Query",
      "Souls",
      data
    );
    return promise.then((data) => QuerySoulsResponse.decode(new Reader(data)));
  }

  Soulbounds(
    request: QuerySoulBoundsRequest
  ): Promise<QuerySoulBoundsResponse> {
    const data = QuerySoulBoundsRequest.encode(request).finish();
    const promise = this.rpc.request(
      "tbruyelle.nebula.sbt.Query",
      "Soulbounds",
      data
    );
    return promise.then((data) =>
      QuerySoulBoundsResponse.decode(new Reader(data))
    );
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array
  ): Promise<Uint8Array>;
}

declare var self: any | undefined;
declare var window: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw "Unable to locate global object";
})();

type Builtin = Date | Function | Uint8Array | string | number | undefined;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
