import React from "react";
import music1 from "../../res/music/New Americana.mp3";
import music2 from "../../res/music/No Time To Die.mp3";

const Music = () => {
    return (
        <div>
            <h3>Music</h3>
            <div>

                <div>
                    <div>
                        <audio src={music1} controls/>
                    </div>
                    <div>
                        <audio src={music2} controls/>
                    </div>
                </div>

            </div>
        </div>
    );
}
export default Music;