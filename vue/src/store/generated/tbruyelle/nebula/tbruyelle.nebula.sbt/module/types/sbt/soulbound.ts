/* eslint-disable */
import * as Long from "long";
import { util, configure, Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "tbruyelle.nebula.sbt";

export interface SoulBound {
  creator: string;
  owner: string;
  id: number;
  soulID: number;
  boundAt: number;
}

const baseSoulBound: object = {
  creator: "",
  owner: "",
  id: 0,
  soulID: 0,
  boundAt: 0,
};

export const SoulBound = {
  encode(message: SoulBound, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.owner !== "") {
      writer.uint32(18).string(message.owner);
    }
    if (message.id !== 0) {
      writer.uint32(24).uint64(message.id);
    }
    if (message.soulID !== 0) {
      writer.uint32(32).uint64(message.soulID);
    }
    if (message.boundAt !== 0) {
      writer.uint32(40).int64(message.boundAt);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): SoulBound {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSoulBound } as SoulBound;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.owner = reader.string();
          break;
        case 3:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          message.soulID = longToNumber(reader.uint64() as Long);
          break;
        case 5:
          message.boundAt = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SoulBound {
    const message = { ...baseSoulBound } as SoulBound;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = String(object.owner);
    } else {
      message.owner = "";
    }
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
    if (object.boundAt !== undefined && object.boundAt !== null) {
      message.boundAt = Number(object.boundAt);
    } else {
      message.boundAt = 0;
    }
    return message;
  },

  toJSON(message: SoulBound): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.owner !== undefined && (obj.owner = message.owner);
    message.id !== undefined && (obj.id = message.id);
    message.soulID !== undefined && (obj.soulID = message.soulID);
    message.boundAt !== undefined && (obj.boundAt = message.boundAt);
    return obj;
  },

  fromPartial(object: DeepPartial<SoulBound>): SoulBound {
    const message = { ...baseSoulBound } as SoulBound;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = object.owner;
    } else {
      message.owner = "";
    }
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
    if (object.boundAt !== undefined && object.boundAt !== null) {
      message.boundAt = object.boundAt;
    } else {
      message.boundAt = 0;
    }
    return message;
  },
};

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
