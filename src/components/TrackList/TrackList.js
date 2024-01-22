import React from "react";
import "./TrackList.modules.css"
import Track from "../Track/Track"

class TrackList extends React.Component {

    render() {
        const { tracks } = this.props;

        return (
            <div className="TrackList">
                {
                tracks && tracks.map(track => {
                    return <Track track={track} 
                    key={track.id}
                    name={track.name}
                    artist={track.artist}
                    album={track.album} 
                    onAdd={this.props.onAdd}
                    onRemove={this.props.onRemove}
                    isRemoval={this.props.isRemoval}
                    />
                }) 
                }
            </div>
        )
    }
    
    
}

export default TrackList;