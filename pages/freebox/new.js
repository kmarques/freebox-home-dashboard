import { useMemo, useState } from "react";
import useFreebox from "../../hooks/freebox";

export default function FreeboxNew() {
  const { discover, connect } = useFreebox();
  const [discoveredFreebox, setDiscoveredFreebox] = useState(null);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDiscover = async () => {
    try {
      setLoading("discover");
      setErrors(null);
      setDiscoveredFreebox(null);
      const freebox = await discover();
      freebox.endpoint = `https://${freebox.api_domain}:${freebox.https_port}${
        freebox.api_base_url
      }v${freebox.api_version.split(".")[0]}`;
      setDiscoveredFreebox(freebox);
    } catch (e) {
      setErrors(e);
    }
    setLoading(false);
  };

  const handleConnect = async () => {
    try {
      setLoading("connect");
      setErrors(null);
      const freebox = await connect(discoveredFreebox);
      console.log(freebox);
    } catch (e) {
      setErrors(e);
    }
    setLoading(false);
  };

  return (
    <>
      <h1>Add a new Freebox</h1>
      <p>
        <button disabled={loading} onClick={handleDiscover}>
          Discover
        </button>
      </p>

      {discoveredFreebox && (
        <>
          <p>
            <strong>{discoveredFreebox.device_name}</strong>
          </p>
          <p>
            <strong>{discoveredFreebox.box_model_name}</strong>
          </p>
          <p>
            <strong>{discoveredFreebox.api_domain}</strong>
          </p>
          <p>
            <strong>{discoveredFreebox.endpoint}</strong>
          </p>
          <button disabled={loading} onClick={handleConnect}>
            Connect
          </button>
          {loading === "connect" && (
            <p>
              Go to your freebox server and accept the connection.
              <br />
              Connecting...
            </p>
          )}
        </>
      )}
      {errors && errors.code === "ENOTFOUND" && <p>No freebox detected</p>}
      {errors && errors.code === "ECONNECT" && errors.status === "timeout" && (
        <p>You didn't accept the application on time</p>
      )}
      {errors && errors.code === "ECONNECT" && errors.status === "denied" && (
        <p>You refused the application</p>
      )}
    </>
  );
}
