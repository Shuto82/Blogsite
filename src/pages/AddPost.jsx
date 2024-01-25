import React from "react";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { NotFound } from "./NotFound";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { CategContext } from "../context/CategContext";
import { useState } from "react";
import { TextEditor } from "../components/TextEditor";
import { FileInput } from "../components/FileInput";
import { uploadFile } from "../utilities/uploadFile";
import { addPost } from "../utilities/crudUtility";

export const AddPost = () => {
  const { user } = useContext(UserContext);
  const { categories } = useContext(CategContext);
  const [categ, setCateg] = useState(0);
  const [title, setTitle] = useState("");
  const [story, setStory] = useState("");
  const [image, setImage] = useState(null);

  if (!user) return <NotFound />;

  console.log(categ, title);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const photoUrl = await uploadFile(image);
      await addPost({
        title, 
        category: categ, 
        photoUrl, 
        author: user.displayName, 
        userId: user.uid, 
        description: story, 
        likes: [], 
        likeCount: 0})
    }
    catch(err) {
console.log(err);
    }
  }


  return (
    <div className="createPost">
      <h3>Poszt hozzáadása</h3>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
      >
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          <TextField
            id="outlined-basic"
            label="Poszt címe"
            autoFocus
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Kategóriák</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={categ}
              label="Kategóriák"
              onChange={(e) => setCateg(e.target.value)}
            >
              <MenuItem value={0}>Válassz egy kategóriát!</MenuItem>
              {categories &&
                categories.map((obj) => (
                  <MenuItem key={obj.name} value={obj.name}>
                    {obj.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Box>
        <FormControl sx={{ width: "100%", display: "flex" }}>
          <TextEditor story={story} setStory={setStory} />
        </FormControl>
        <FileInput setImage={setImage} />
        <Button type="submit" disabled={title.length == 0 || categ == 0 || story.length == 0 || !image} variant="contained">Contained</Button>
      </Box>
    </div>
  );
};
