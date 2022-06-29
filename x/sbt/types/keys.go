package types

import "encoding/binary"

const (
	// ModuleName defines the module name
	ModuleName = "sbt"

	// StoreKey defines the primary module store key
	StoreKey = ModuleName

	// RouterKey is the message route for slashing
	RouterKey = ModuleName

	// QuerierRoute defines the module's query routing key
	QuerierRoute = ModuleName

	// MemStoreKey defines the in-memory store key
	MemStoreKey = "mem_sbt"
)

// Keys for sbt store
//
// - 0x00<soulID_Bytes>: Soul
// - 0x01: nextSoulID
var (
	SoulKeyPrefix = []byte{0x00}
	SoulIDKey     = []byte{0x01}
)

func GetSoulIDBytes(soulID uint64) []byte {
	bz := make([]byte, 8)
	binary.BigEndian.PutUint64(bz, soulID)
	return bz
}

func GetSoulIDFromBytes(bz []byte) uint64 {
	return binary.BigEndian.Uint64(bz)
}

func SoulKey(soulID uint64) []byte {
	return append(SoulKeyPrefix, GetSoulIDBytes(soulID)...)
}

func KeyPrefix(p string) []byte {
	return []byte(p)
}
