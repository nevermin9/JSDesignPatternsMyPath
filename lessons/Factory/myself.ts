interface Player {
    getListOfGames(): Array<string>;
    getResultOfEveryGame(): Array<{}>;
}

class GoPlayer implements Player {
    getListOfGames() {
        return ['week-game', 'firday-game']
    }

    getResultOfEveryGame() {
        return [{'p1': 1, 'p2': 33}, {'p1': 32, 'p2': 32}]
    }
}

class ChessPlayer implements Player {
    getListOfGames() {
        return ['board-vs', 'paris-vs']
    }

    getResultOfEveryGame() {
        return [{'p1': 1, 'p2': 33}, {'p1': 32, 'p2': 32}]
    }
}

abstract class PlayerFactory {
    abstract createPlayer(): Player
}

class ChessPlayersFactory extends PlayerFactory {
    createPlayer(): ChessPlayer {
        return new ChessPlayer()
    }
}

class GoPlayersFactory extends PlayerFactory {
    createPlayer(): GoPlayer {
        return new GoPlayer()
    }
}