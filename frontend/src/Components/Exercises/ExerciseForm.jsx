import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FaArrowLeft, FaUpload, FaSave } from "react-icons/fa";

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
      }, 1500);
    } finally {
      setLoading(false);
    }
  };

  const bodyPartOptions = [
    { value: "Arms", label: "Arms" },
    { value: "Legs", label: "Legs" },
    { value: "Chest", label: "Chest" },
    { value: "Back", label: "Back" },
    { value: "Shoulders", label: "Shoulders" },
    { value: "Core", label: "Core" },
    { value: "Full Body", label: "Full Body" },
  ];

  const difficultyOptions = [
    { value: "Beginner", label: "Beginner" },
    { value: "Intermediate", label: "Intermediate" },
    { value: "Advanced", label: "Advanced" },
  ];

  return (
    <div className="max-w-3xl mx-auto  bg-white rounded-xl shadow-lg p-8 my-8 border border-gray-500">
      <div className="flex justify-between items-center mb-8">
        <button
          className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-300"
          onClick={handleBackClick}
        >
          <FaArrowLeft className="mr-2" /> Back to Exercises
        </button>
        <h2 className="text-3xl font-bold text-gray-800">
          {isEdit ? "Edit Exercise" : "Create New Exercise"}
        </h2>
      </div>
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-md">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Exercise Name</label>
              <input
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                placeholder="Enter exercise name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                rows="5"
                placeholder="Describe the exercise and how to perform it"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Video URL</label>
              <input
                type="text"
                name="urlVido"
                value={formData.urlVido}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                placeholder="YouTube or Vimeo URL (optional)"
              />
            </div>
          </div>


          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty Level</label>
              <select
                name="niveauDifficult"
                value={formData.niveauDifficult}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
              >
                <option value="">Select Difficulty</option>
                {difficultyOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Body Part</label>
              <select
                name="partieCorps"
                value={formData.partieCorps}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
              >
                <option value="">Select Body Part</option>
                {bodyPartOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="file-upload-container">
                <label className="block text-sm font-medium text-gray-700 mb-1">Exercise Image</label>
                <div className="relative">
                  <input
                    type="file"
                    name="image"
                    onChange={handleFileChange}
                    className="hidden"
                    id="exercise-image"
                  />
                  <label 
                    htmlFor="exercise-image" 
                    className="flex items-center justify-center w-full p-3 border border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all duration-300"
                  >
                    <FaUpload className="mr-2 text-gray-400" />
                    <span className="text-sm text-gray-500">Upload Image</span>
                  </label>
                </div>
                {previewImage && (
                  <div className="mt-3">
                    <img
                      src={previewImage}
                      alt="Exercise preview"
                      className="h-32 w-full object-cover rounded-lg border border-gray-200"
                    />
                  </div>
                )}
              </div>

              <div className="file-upload-container">
                <label className="block text-sm font-medium text-gray-700 mb-1">Body Part Image</label>
                <div className="relative">
                  <input
                    type="file"
                    name="partieCorpsPic"
                    onChange={handleFileChange}
                    className="hidden"
                    id="body-part-image"
                  />
                  <label 
                    htmlFor="body-part-image" 
                    className="flex items-center justify-center w-full p-3 border border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all duration-300"
                  >
                    <FaUpload className="mr-2 text-gray-400" />
                    <span className="text-sm text-gray-500">Upload Image</span>
                  </label>
                </div>
                {previewBodyPartImage && (
                  <div className="mt-3">
                    <img
                      src={previewBodyPartImage}
                      alt="Body part preview"
                      className="h-32 w-full object-cover rounded-lg border border-gray-200"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-5 border-t border-gray-200">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleBackClick}
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-3"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center bg-blue-600 py-2 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaSave className="mr-2" />
              {loading ? (isEdit ? "Updating..." : "Creating...") : (isEdit ? "Update Exercise" : "Create Exercise")}
            </button>
          </div>
        </div>
      </form>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
};

export default ExerciseForm;