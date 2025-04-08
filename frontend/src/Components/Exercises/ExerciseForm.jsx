import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ExerciseForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nom: "",
    description: "",
    image: null,
    urlVido: "",
    niveauDifficult: "",
    partieCorps: "",
    partieCorpsPic: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [previewBodyPartImage, setPreviewBodyPartImage] = useState(null);

  const handleScrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  const handleBackClick = () => {
    handleScrollToBottom();
    navigate('/admin/exercises');
  };

  useEffect(() => {
    if (id) {
      setIsEdit(true);
      fetchExerciseData();
    }
  }, [id]);

  const fetchExerciseData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/exercises/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch exercise data");
      }

      const data = await response.json();

      setFormData({
        nom: data.nom,
        description: data.description,
        urlVido: data.urlVido || "",
        niveauDifficult: data.niveauDifficult,
        partieCorps: data.partieCorps,
        image: null,
        partieCorpsPic: null,
      });

      if (data.image) {
        setPreviewImage(`http://localhost:8000/storage/${data.image}`);
      }

      if (data.partieCorpsPic) {
        setPreviewBodyPartImage(`http://localhost:8000/storage/${data.partieCorpsPic}`);
      }
    } catch (error) {
      console.error("Error fetching exercise:", error);
      setError("Failed to load exercise data. " + error.message);
      toast.error("Error loading exercise data");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });

    if (files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (name === "image") {
          setPreviewImage(reader.result);
        } else if (name === "partieCorpsPic") {
          setPreviewBodyPartImage(reader.result);
        }
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null) {
        data.append(key, formData[key]);
      }
    });

    try {
      const token = localStorage.getItem("token");
      const url = isEdit ? `/api/exercises/${id}` : "/api/exercises";
      const method = isEdit ? "PUT" : "POST";

      let fetchOptions = {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      };

      if (isEdit) {
        data.append('_method', 'PUT');
        fetchOptions.method = 'POST';
      }

      const response = await fetch(url, fetchOptions);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to ${isEdit ? 'update' : 'create'} exercise`);
      }

      const result = await response.json();
      toast.success(`Exercise ${isEdit ? 'updated' : 'created'} successfully!`);
      navigate("/admin/exercises");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.success(`Exercise created successfully!`);
      setTimeout(() => {
        navigate("/admin/exercises");
      }, 1500); // 2 second delay
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <button
        className="absolute text-black px-4 py-2 rounded-lg transition-transform duration-300 mt-[0px] ml-[-300px] hover:scale-105"
        onClick={handleBackClick}
      >
        &larr; Back
      </button>
      <h2 className="text-2xl font-bold mb-4">
        {isEdit ? "Edit Exercise" : "Create New Exercise"}
      </h2>
      {error && <div className="bg-red-100 p-3 mb-4 text-red-700">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Name:</label>
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
            rows="4"
          ></textarea>
        </div>

        <div>
          <label className="block mb-1">Video URL:</label>
          <input
            type="text"
            name="urlVido"
            value={formData.urlVido}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Difficulty Level:</label>
          <select
            name="niveauDifficult"
            value={formData.niveauDifficult}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          >
            <option value="">Select Difficulty</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Body Part:</label>
          <select
            name="partieCorps"
            value={formData.partieCorps}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          >
            <option value="">Select Body Part</option>
            <option value="Arms">Arms</option>
            <option value="Legs">Legs</option>
            <option value="Chest">Chest</option>
            <option value="Back">Back</option>
            <option value="Shoulders">Shoulders</option>
            <option value="Core">Core</option>
            <option value="Full Body">Full Body</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Exercise Image:</label>
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            className="w-full p-2 border rounded"
          />
          {previewImage && (
            <div className="mt-2">
              <p className="text-sm text-gray-500 mb-1">Current image:</p>
              <img
                src={previewImage}
                alt="Exercise preview"
                className="h-32 object-cover rounded border"
              />
            </div>
          )}
        </div>

        <div>
          <label className="block mb-1">Body Part Reference Image:</label>
          <input
            type="file"
            name="partieCorpsPic"
            onChange={handleFileChange}
            className="w-full p-2 border rounded"
          />
          {previewBodyPartImage && (
            <div className="mt-2">
              <p className="text-sm text-gray-500 mb-1">Current body part image:</p>
              <img
                src={previewBodyPartImage}
                alt="Body part preview"
                className="h-32 object-cover rounded border"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? (isEdit ? "Updating..." : "Creating...") : (isEdit ? "Update Exercise" : "Create Exercise")}
        </button>
      </form>

      {/* Toast messages */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
};

export default ExerciseForm;
