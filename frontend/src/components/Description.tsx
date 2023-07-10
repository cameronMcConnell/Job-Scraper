import React  from 'react';
import '../styles/Description.css';

// Props for the component.
interface descriptionProps {
    description: string,
    onReturn: (isDescription: boolean, jobDescription: string) => void
};

const Description = (props: descriptionProps): JSX.Element => {
    return (
        <div id='description-container'>
            <header><button onClick={() => props.onReturn(false, '')} id='exit-button'>Exit</button></header>
            <p>
                {props.description}
            </p>
        </div>
    );
}

export default Description;