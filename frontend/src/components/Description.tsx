import { useEffect }  from 'react';
import '../styles/Description.css';

// Props for the component.
interface descriptionProps {
    description: string,
    onReturn: (isDescription: boolean, jobDescription: string) => void
};

const Description = (props: descriptionProps): JSX.Element => {
    // On init
    useEffect(() => setDescHeight(), [])

    // On init
    const setDescHeight = (): void => {
        const element: HTMLElement | null = document.getElementById('#description-container');
        if (element) { element.style.top = window.pageYOffset + 'px'; }
    }

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