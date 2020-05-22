import React, {useState} from "react";
import Spinner from "react-svg-spinner";

const styles = {
    btn: {
        width: '124px',
        borderRadius: '3px',
        display: 'inline-block',
        borderStyle: 'solid',
        borderWidth: '1px',
        verticalAlign: 'middle',
        height: '2em',
        lineHeight: '2em',
        padding: '1px 0',
        fontWeight: 'normal',
        fontSize: '14px',
        fontFamily: 'Helvetica, Arial, sans-serif',
        textAlign: 'center',
        color: '#333',
        outline: 0,
    },
    btnLabel: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnIcon: {
        height: 16,
    }
};

const PlayButton = ({handlePlay}) => {

    const [status, setStatus] = useState(null);

    return (
        <button
            style={styles.btn}
            disabled={status !== null}
            onClick={() => handlePlay(setStatus)}
        >
            {status === 'error' ? (
                <span style={styles.btnLabel}>
                    <svg viewBox="0 0 100 100" style={styles.btnIcon}>
                        <path d="M94 78.2L55.9 14.4c-2.7-4.5-9.2-4.9-12-.5L6.1 78.1c-3 4.7.4 11.9 6 11.9h75.8c5.5 0 8.9-7.1 6.1-11.8zm-44.2 1c-2.7 0-4.9-2.2-4.9-4.9s2.2-4.9 4.9-4.9 4.9 2.2 4.9 4.9-2.2 4.9-4.9 4.9zm5.2-18c0 2.7-2.3 4.9-5 4.9s-5-2.2-5-4.9V35.6c0-2.7 2.3-4.9 5-4.9s5 2.2 5 4.9v25.6z" />
                    </svg>
                    &nbsp;Not found
                </span>
            ) : status === 'loading' ? (
                <span style={styles.btnLabel}>
                    <Spinner size="14px"/>
                    &nbsp;Loading
                </span>
            ) : (
                <span style={styles.btnLabel}>
                    <svg viewBox="0 0 100 100" style={styles.btnIcon}>
                        <path d="M50 12c-20.987 0-38 17.013-38 38s17.013 38 38 38 38-17.013 38-38-17.013-38-38-38zM39 32l30 18-30 18z" overflow="visible"/>
                    </svg>
                    &nbsp;Listen
                </span>
            )}
        </button>
    );
};

export default PlayButton;
