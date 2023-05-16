import { RevolvingDot } from 'react-loader-spinner';

export const Loader = () => {
  const style = {
    position: 'fixed',
    bottom: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };

  return (
    <div style={style}>
      <RevolvingDot
        height="100"
        width="140"
        radius="30"
        color="#303f9f"
        secondaryColor="#3f51b5"
        ariaLabel="revolving-dot-loading"
        visible={true}
      />
    </div>
  );
};
