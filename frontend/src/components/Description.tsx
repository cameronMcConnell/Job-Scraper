import { useEffect }  from 'react';
import '../styles/Description.css';

// Props for the component.
interface descriptionProps {
    description: string,
    setIsDescription: React.Dispatch<React.SetStateAction<boolean>>,
    setJobDescription: React.Dispatch<React.SetStateAction<string>>
};

const Description = (props: descriptionProps): JSX.Element => {
    // On init.
    useEffect(() => setDescHeight(), [])

    // On init.
    const setDescHeight = (): void => {
        const element: HTMLElement | null = document.getElementById('#description-container');
        if (element) { element.style.top = window.pageYOffset + 'px'; }
    }

    // No need to do on return stuff.
    const handleOnClick = (): void => {
      props.setIsDescription(false);
      props.setJobDescription('');
    }

    return (
        <div id='description-container'>
            <header><button onClick={() => handleOnClick()} id='exit-button'>Exit</button></header>
            <p>
                {props.description}
            </p>
        </div>
    );
}

export default Description;