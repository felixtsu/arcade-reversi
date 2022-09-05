namespace reversi {

    const BLACK = "BLACK;";
    const WHITE = "WHITE";

    const COL_MAX = 8;
    const COL_MIN = 1;

    const ROW_MAX = 7;
    const ROW_MIN = 0;

    let currentPlayer = BLACK;

    function isBlackTurn() {
        return currentPlayer == BLACK;
    }

    function switchPlayer() {
        if (isBlackTurn()) {
            currentPlayer = WHITE;
            cursor.setImage(assets.image`whiteCursor`)
        } else {
            currentPlayer = BLACK;
            cursor.setImage(assets.image`blackCursor`)
        }
        
    }


    function reversi() {

    }

    function tryToPlace() :boolean {
        let loc = tiles.locationOfSprite(cursor)
        if (tiles.getTileAt(loc.column, loc.row) == sprites.dungeon.floorLight2) {
            //TODO should check whether can reversi

            place()
            reversi()
            return true;
        } else {
            return false;
        }
        
    }

    function place() {
        if (currentPlayer)
            tiles.setTileAt(tiles.locationOfSprite(cursor), isBlackTurn() ? assets.tile`blackPiece` : assets.tile`whitePiece`);
    }

    controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
        if (tryToPlace()) {
            switchPlayer()
        } else {
            scene.cameraShake();
        }
        
    })

    controller.up.onEvent(ControllerButtonEvent.Pressed, function() {
        let loc = tiles.locationOfSprite(cursor);
        if (loc.row != ROW_MIN) {
            tiles.placeOnTile(cursor, tiles.getTileLocation(loc.col, loc.row - 1))
        }
    })
    controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
        let loc = tiles.locationOfSprite(cursor);
        if (loc.row != ROW_MAX) {
            tiles.placeOnTile(cursor, tiles.getTileLocation(loc.col, loc.row + 1))
        }
    })
    controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
        let loc = tiles.locationOfSprite(cursor);
        if (loc.col != COL_MIN) {
            tiles.placeOnTile(cursor, tiles.getTileLocation(loc.col - 1, loc.row))
        }
    })
    controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
        let loc = tiles.locationOfSprite(cursor);
        if (loc.col != COL_MAX) {
            tiles.placeOnTile(cursor, tiles.getTileLocation(loc.col + 1, loc.row))
        }
    })
    tiles.setCurrentTilemap(tilemap`级别`)
    let cursor = sprites.create(assets.image`blackCursor`, SpriteKind.Player)
    tiles.placeOnTile(cursor, tiles.getTileLocation(5,5))

    scene.cameraFollowSprite(cursor)
    info.player1.setScore(2)
    
    info.player2.setScore(2)

    info.player1.border = 15
    info.player1.bg = 15
    info.player1.fc = 1

    info.player2.border = 1
    info.player2.bg = 1
    info.player2.fc = 15
}
