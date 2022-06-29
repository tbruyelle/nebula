package keeper

import (
	"github.com/tbruyelle/nebula/x/sbt/types"
)

var _ types.QueryServer = Keeper{}
