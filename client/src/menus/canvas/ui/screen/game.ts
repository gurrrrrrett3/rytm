import UiScreen from "../../../../engine/ui/uiScreen";
import SongTitle from "../component/songtitle";
import StatusBar from "../component/statusbar";

export default class Screen_Game extends UiScreen {
    constructor() {
        super('game');

        this.add(
            new StatusBar(),
            new SongTitle()
        )

    }
}