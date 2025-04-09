import React from "react";

const CreatePool = () => {
  return (
    <div class="container mt-5">
    <h2>Create Pool</h2>
    <form>
        <div class="mb-3">
            <label for="poolName" class="form-label">Pool Name</label>
            <input type="text" class="form-control" id="poolName" placeholder="Enter pool name" required></input>
        </div>

        <div class="mb-3">
            <label for="league" class="form-label">League</label>
            <select class="form-select" id="league" required>
                <option value="NFL">NFL</option>
            </select>
        </div>

        <div class="mb-3">
            <label for="maxPot" class="form-label">Max Pot</label>
            <input type="number" class="form-control" id="maxPot" placeholder="Enter max pot" required></input>
        </div>

        <button type="submit" class="btn btn-primary">Create Pool</button>
    </form>
</div>
  );
};

export default CreatePool;
